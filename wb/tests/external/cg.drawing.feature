Feature: Center of Gravity

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
        |    station    | weight |
        | frontseat-1   |    180 |
        | frontseat-2   |    110 |
        | tank          |    240 |
    When I wait for the graphs to refresh
    Then I see the CG graph displays the normal envelope's points: "7,80 7,47 23,29 47,4 87,4 87,80"
    Then I see the CG graph displays the utility envelope's points: "7,80 7,47 23,29 43,29 43,80"
    Then I see the CG graph displays the "ramp" point at "45, 31" with label "ramp"
    Then I see the CG graph displays the "zero-fuel" point at "39, 49" with label "zero fuel"
