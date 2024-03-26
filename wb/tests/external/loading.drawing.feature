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
        | frontseat-1     |    180 |
        | frontseat-2     |    110 |
        | gallons         |     40 |
    When I wait for the graphs to refresh
    Then I see the "frontseat" loading line from origin to "42,9" with mark at "31,28"
    Then I see the "tank" loading line from origin to "44,23" with mark at "33,37"
