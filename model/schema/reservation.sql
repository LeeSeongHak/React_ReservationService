--CREATE
CREATE TABLE reservation_table(
   brdno SERIAL PRIMARY KEY,
   starttime TIMESTAMP,
   endtime TIMESTAMP,
   username VARCHAR(50)
);

--DROP
DROP TABLE reservation_table;

--SELECT
SELECT brdno
	, to_char(starttime, 'YYYY/MM/DD HH24:MI') AS starttime
	, to_char(endtime, 'YYYY/MM/DD HH24:MI') AS endtime
	, username 
	FROM reservation_table
	ORDER BY brdno;

--INSERT
INSERT INTO reservation_table(
	starttime,
	endtime,
	username
	) VALUES(
	'2019/12/20 09:00',
	'2019/12/21 10:00',
	'LEE'
);

--UPDATE
UPDATE reservation_table SET
	starttime = '2019/12/20 10:00',
	endtime = '2019/12/20 12:00',
	username = 'lee'
	WHERE brdno = '3';

--DELETE
DELETE FROM reservation_table WHERE brdno = '';