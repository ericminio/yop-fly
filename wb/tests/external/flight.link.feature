Feature: Flight link

Background:
    Given the following planes:
        """
            {
                name: 'CGSAM',
                weight: 1642.15,
                type: '172s',
                moment: 66200.42
            }
        """

Scenario: Live update of flight link url
	Given load is:
        |     station      | weight |
        | front-seat-left  |    180 |
        | front-seat-right |    110 |
		| back-seat-left   |    120 |
        | back-seat-right  |    130 |
        | tank             |    240 |
		| baggage-1        |     20 |
		| baggage-2        |     20 |
	Then the flight link info is "eyJwbGFuZSI6IkNHQk1PIiwiZnJvbnQtc2VhdC1sZWZ0IjoiMTgwIiwiZnJvbnQtc2VhdC1yaWdodCI6IjExMCIsImJhY2stc2VhdC1sZWZ0IjoiMTIwIiwiYmFjay1zZWF0LXJpZ2h0IjoiMTMwIiwiZ2FsbG9ucyI6IjQwIiwidGFuayI6IjI0MCIsImJhZ2dhZ2UtMSI6IjIwIiwiYmFnZ2FnZS0yIjoiMjAifQ=="
