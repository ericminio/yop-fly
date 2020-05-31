Feature: Flight injection

Background:
    Given the following planes:
        """
            {
                name: 'CGSAM',
                type: '172s',
                weight: 1642.15,
                moment: 66200.42
            },
            {
                name: 'CGSDZ',
                type: '172s',
                weight: 1509.1,
                moment: 65080.81
            }
        """

Scenario: Select injected plane
    When I access the home page with flight info "eyJwbGFuZSI6IkNHU0RaIiwiZnJvbnRzZWF0LTEiOiIxODAiLCJmcm9udHNlYXQtMiI6IjExMCIsImJhY2tzZWF0LTEiOiIxMjAiLCJiYWNrc2VhdC0yIjoiMTMwIiwiZ2FsbG9ucyI6IjMwIiwidGFuayI6IjE4MCIsImJhZ2dhZ2UxIjoiNTUiLCJiYWdnYWdlMiI6IjI1In0="
    Then the selected plane is "CGSDZ"
    And I see that the plane's weight is "1509.1"
    Then I see that the weight of station "frontseat-1" is "180"
    Then I see that the weight of station "frontseat-2" is "110"
    Then I see that the weight of station "backseat-1" is "120"
    Then I see that the weight of station "backseat-2" is "130"
    Then I see that the weight of station "tank" is "180"
    Then I see that the weight of station "baggage1" is "55"
    Then I see that the weight of station "baggage2" is "25"
    Then I see the "tank" loading line from origin to "44,23" with mark at "25,48"
