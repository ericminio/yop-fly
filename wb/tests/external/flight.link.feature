Feature: Flight link

Background:
    Given the following planes:
        """
            {
                name: 'CGSDZ',
                weight: 1642.15,
                type: '172s',
                moment: 66200.42
            }
        """

Scenario: Live update of flight link url
	Given load is:
        | frontseat-1     |    180 |
        | frontseat-2     |    110 |
		| backseat-1      |    120 |
        | backseat-2      |    130 |
        | gallons         |     30 |
		| baggage1        |     55 |
		| baggage2        |     25 |
	Then the flight link info is "eyJwbGFuZSI6IkNHU0RaIiwiZnJvbnRzZWF0LTEiOiIxODAiLCJmcm9udHNlYXQtMiI6IjExMCIsImJhY2tzZWF0LTEiOiIxMjAiLCJiYWNrc2VhdC0yIjoiMTMwIiwiZ2FsbG9ucyI6IjMwIiwidGFuayI6IjE4MCIsImJhZ2dhZ2UxIjoiNTUiLCJiYWdnYWdlMiI6IjI1In0="
