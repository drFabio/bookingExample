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
	AND (B.canceled != 1 OR b.canceled IS NULL)
`;
export const CHECK_BOOKED_PROPERTY = `
 ${GET_BOOKINGS_ON_PERIOD} AND B.property_id = @id LIMIT 1
`;

const UNBOOKED_PROPERTIES_CONDITION = `P.id NOT IN(${GET_BOOKINGS_ON_PERIOD})`;

export const GET_AVAILABLE_PROPERTIES = `
		${GET_ALL_PROPERTIES}  WHERE ${UNBOOKED_PROPERTIES_CONDITION}
`;

export const BOOK_PROPERTY = `
	INSERT INTO Bookings (user_id, property_id, start_date, end_date)
			VALUES (@user, @property, @start, @end)
`;

export const CANCEL_BOOKING = `
		UPDATE Bookings SET canceled =1 WHERE id = @id
`;
export const GET_ALL_BOOKINGS = `
SELECT B.*, 
			 P.id   AS property_id, 
			 P.name AS property_name, 
			 P.city, 
			 P.capacity, 
			 U.email, 
			 U.password, 
			 U.name AS user_name 
FROM   bookings B 
			 LEFT JOIN properties P 
							ON P.id = B.property_id 
			 LEFT JOIN users U 
							ON U.id = B.user_id 
				
`;
export const GET_USER_BOOKINGS = `
		${GET_ALL_BOOKINGS}
		WHERE B.user_id = @user
`;

export const GET_SINGLE_BOOKING = `
	${GET_ALL_BOOKINGS} WHERE B.id = @id
`;
