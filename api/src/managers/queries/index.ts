export const GET_ALL_PROPERTIES = `
  SELECT P.* FROM Properties P 
`;
export const GET_SINGLE_PROPERTY = `
 ${GET_ALL_PROPERTIES} WHERE P.id = @id
`;
const GET_BOOKINGS_ON_PERIOD = `
	SELECT DISTINCT B.property_id
	FROM Bookings B 
	WHERE
		(
			B.start_date BETWEEN DATE(@start) AND DATE(@end)
			OR B.end_date BETWEEN  DATE(@start) AND DATE(@end)
		) 
	AND B.canceled != 1
`;
export const CHECK_BOOKED_PROPERTY = `
 ${GET_BOOKINGS_ON_PERIOD} AND B.property_id = @id LIMIT 1
`;

const UNBOOKED_PROPERTIES_CONDITION = `P.id NOT IN(${GET_BOOKINGS_ON_PERIOD})`;

export const GET_AVAILABLE_PROPERTIES = `
	${GET_ALL_PROPERTIES}  WHERE ${UNBOOKED_PROPERTIES_CONDITION}
`;

export const BOOK_PROPERTY = `
	INSERT INTO BOOKINGS (user_id, property_id, start_date, end_date)
		VALUES (@user, @property, @start, @end)
`;

export const CANCEL_BOOKING = `
	UPDATE BOOKINGS SET canceled =1 WHERE id = @id
`;
