Feature: Plane selection

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
                name: 'CGINH',
                type: '172s',
                weight: 1509.1,
                moment: 65080.81
            }
        """

Scenario: First plane is selected by default
    When I access the home page
    Then I see that the only planes that can be selected are:
        """
            CGSAM
            CGINH
        """
    And the selected plane is "CGSAM"
    And I see that the plane's weight is "1642.15"
    And I see that the plane's moment is "66200.42"
    And I see that the plane's arm is "40.313"

Scenario: Select a different plane
    When I access the home page
    When I select the plane "CGINH"
    Then I see that the plane's weight is "1509.1"
    And I see that the plane's moment is "65080.81"
    And I see that the plane's arm is "43.126"

Scenario: Keep flight config
    When I access the home page
    When load is:
        |     station     | weight |
        | frontseat-1     |     80 |
        | frontseat-2     |     70 |
     When I select the plane "CGINH"
     Then I see that the weight of station "frontseat-1" is "80"
     Then I see that the weight of station "frontseat-2" is "70"