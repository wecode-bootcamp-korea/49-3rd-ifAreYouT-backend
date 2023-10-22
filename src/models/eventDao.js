const { dataSource } = require('./dataSource');

const totalCountBySearch = async (keyword) => {
  let query = `
    SELECT COUNT(*) as total FROM events where events.title LIKE '%${keyword}%'
   `;
  return await dataSource.query(query);
};

const viewBySearch = async (keyword) => {
  let query = `
    SELECT
    categories.category_name as category,
    events.id, 
    events.title, 
    stages.name as stage,
    DATE_FORMAT(events.start_date, '%Y.%m.%d') AS startDate,
    DATE_FORMAT(events.end_date, '%Y.%m.%d') AS endDate,
    TIME_FORMAT(times.event_time, '%h:%i') as eventTime,
    event_images.thumbnail_image_url as thumbnailImage
    from events
    left join
    categories on events.category_id = categories.id
    left join
    stages on events.stage_id = stages.id
    left join
    times on events.id = times.event_id
    left join
    event_images on events.id = event_images.event_id
    WHERE events.title LIKE '%${keyword}%'
    `;
  return await dataSource.query(query);
};

const totalCountByCategory = async (category) => {
  let query = `
    SELECT COUNT(*) as total 
    FROM events
    LEFT JOIN
    categories on events.category_id = categories.id
    WHERE categories.category_name = '${category}'
   `;
  return await dataSource.query(query);
};

const viewByCategory = async (category, orderByQuery, pageQuery) => {
  let query = `
    SELECT
    categories.category_name AS category,
    events.id AS id, 
    events.title AS title, 
    stages.name AS stage,
    DATE_FORMAT(events.start_date, '%Y.%m.%d') AS startDate,
    DATE_FORMAT(events.end_date, '%Y.%m.%d') AS endDate,
    TIME_FORMAT(times.event_time, '%h:%i') AS eventTime,
    event_images.thumbnail_image_url AS thumbnailImage,
    COUNT(event_reactions.id) AS likes,
  	reserved_seats.reserved_counts AS reserved 
	  FROM events
    LEFT JOIN
    categories on events.category_id = categories.id
    LEFT JOIN
    stages on events.stage_id = stages.id
    LEFT JOIN
    times on events.id = times.event_id
    LEFT JOIN
    event_images on events.id = event_images.event_id
    LEFT JOIN
    event_reactions on event_reactions.event_id = events.id
    LEFT JOIN
	  (SELECT 
	  event_id,
	  COUNT(event_seats.event_id) AS reserved_counts
  	FROM event_seats 
  	LEFT JOIN
    events ON event_seats.event_id = events.id
    WHERE event_seats.status = 'disabled'
    GROUP BY event_seats.event_id
    ) reserved_seats ON reserved_seats.event_id = events.id    
    WHERE categories.category_name = '${category}'
    AND event_reactions.reaction_type = 'exited'
    GROUP BY category, id, title, stage, startDate, endDate, eventTime, thumbnailImage, reserved
    ${orderByQuery}
    ${pageQuery}
  `;
  return await dataSource.query(query);
};

const eventDetail = async (id) => {
  let query = `
    SELECT
    categories.category_name AS category,
    events.id,
    events.title,
    performers.name AS performer,
    stages.name AS stage,
    events.description,
    DATE_FORMAT(events.start_date, '%Y.%m.%d') AS startDate,
    DATE_FORMAT(events.end_date, '%Y.%m.%d') AS endDate,
    DATE_FORMAT(events.sales_start_date, '%Y.%m.%d') AS salesStartDate,
    DATE_FORMAT(events.sales_end_date, '%Y.%m.%d') AS salesEndDate,
    events.playtime AS playTime,
    TIME_FORMAT(times.event_time, '%h:%i') AS eventTime,
    event_images.thumbnail_image_url AS thumbnailImage,
    event_images.detail_image_url AS detailImage,
    events.status,
    events.promotion_id as promotionId
    FROM events
    LEFT JOIN
    categories ON events.category_id = categories.id
    LEFT JOIN
    performers ON events.performer_id = performers.id
    LEFT JOIN
    stages ON events.stage_id = stages.id
    LEFT JOIN
    times ON events.id = times.event_id
    LEFT JOIN
    event_images ON events.id = event_images.event_id
    WHERE events.id = ${id}
 `;
  return await dataSource.query(query);
};

const remainingSeats = async (id) => {
  let query = `
    SELECT
    seat_grades.grade AS grade,
    seat_grades.price AS price,
    count(event_seats.id) AS available
    FROM
    seat_grades
    LEFT JOIN
    seats ON seat_grades.id = seats.grade_id 
    LEFT JOIN
    event_seats ON seats.id = event_seats.seat_id
    LEFT JOIN
    events on event_seats.event_id = events.id
    WHERE event_seats.event_id = ${id}
    AND event_seats.status = 'available'
    GROUP BY grade, price
   `;
  return await dataSource.query(query);
};

const reactions = async (id) => {
  let query = `
    SELECT
    SUM(CASE WHEN event_reactions.reaction_type = 'exited' THEN 1 ELSE 0 END) AS up,
    SUM(CASE WHEN event_reactions.reaction_type = 'unexited' THEN 1 ELSE 0 END) AS down
    FROM events
    LEFT JOIN event_reactions ON events.id = event_reactions.event_id
    where events.id = ${id}
    `;
  return await dataSource.query(query);
};

const participatedOrNot = async (userId, id) => {
  let input = 0;
  if (userId) {
    input = userId;
  }
  let query = `
    SELECT COUNT(*) AS status
    FROM event_reactions
    WHERE event_id = ${id} and user_id = ${input}
    `;
  return await dataSource.query(query);
};

const checkParticipation = async (eventId, userId, reaction) => {
  let query = `
    SELECT
    event_reactions.id
    FROM
    event_reactions WHERE event_id = ${eventId} AND user_id = ${userId}
    `;
  return await dataSource.query(query);
};

const updateReaction = async (eventId, userId, reaction) => {
  await dataSource.query(
    `
  INSERT INTO event_reactions (event_id, user_id, reaction_type) VALUES (?, ?, ?)
  `,
    [eventId, userId, reaction],
  );
};

const viewEventsMain = async () => {
  let query = `
    SELECT
    events.id,
    events.title,
    event_images.thumbnail_image_url
    FROM events
    LEFT JOIN event_images ON events.id = event_images.event_id
    ORDER BY RAND()
    LIMIT 3
    `;
  return await dataSource.query(query);
};

const viewPromotionsMain = async () => {
  let query = `
    SELECT
    promotions.id AS promotionId,
    promotion_questions.promotion_id AS promotionQuestionId
    FROM promotions
    LEFT JOIN promotion_questions ON promotion_questions.promotion_id = promotions.id
    ORDER BY RAND()
    LIMIT 3
    `;
  return await dataSource.query(query);
};

const checkPass = async (userId, eventId) => {
  let query = `
   SELECT
   preorder_passes.id
   FROM preorder_passes
   LEFT JOIN users ON preorder_passes.user_id = users.id
   LEFT JOIN events ON preorder_passes.event_id = events.id
   WHERE users.id = ${userId} AND events.id = ${eventId}
   `;
  return await dataSource.query(query);
};

const getCoordinate = async (stageId) => {
  let query = `
   SELECT
   stages.id,
   stages.name,
   stages.location_lat AS latitude,
   stages.location_lon AS longitude
   FROM
   stages
   WHERE stages.id = ${stageId}
   `;
  return await dataSource.query(query);
};

module.exports = {
  totalCountBySearch,
  viewBySearch,
  viewByCategory,
  totalCountByCategory,
  eventDetail,
  remainingSeats,
  reactions,
  participatedOrNot,
  checkParticipation,
  updateReaction,
  viewEventsMain,
  viewPromotionsMain,
  checkPass,
  getCoordinate,
};
