Feature: Weight and balance

Background:
    Given the following planes:
        """
            {
                name: 'CGSAM',
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
        | fuel             |    240 |
    When I click to refresh the graphs
    Then I see the normal envelope's points: "8,80 27,47 45,29 70,4 89,4 30,80"
    Then I see the utility envelope's points: "8,80 27,47 45,29 52,29 18,80"
    Then I see the "ramp" point at "51, 31" with label "ramp"
    Then I see the "zero-fuel" point at "38, 49" with label "zero fuel"