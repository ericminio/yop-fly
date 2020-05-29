Feature: Loading

Background:
    Given the following planes:
        """
            {
                name: 'CGSAM',
                type: '172s',
                weight: 1642.15,
                moment: 66200.42
            }
        """
    Given I access the home page

Scenario: Easy ride
    Given load is:
        |     station      | weight |
        | front-seat-left  |    180 |
        | front-seat-right |    110 |
        | tank             |    240 |
    When I click to refresh the graphs
    Then I see the "frontseat" loading line from origin to "42,9" with mark at "31,28"
    Then I see the "tank" loading line from origin to "44,23" with mark at "33,37"
