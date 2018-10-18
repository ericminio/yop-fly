Feature: Plane selection

Background:
    Given the following planes:
        """
            {
                name: 'CGSAM',
                weight: 1642.15,
                moment: 66200.42
            },
            {
                name: 'CGINH',
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
    And The selected plane is "CGSAM"
    And I see that the plane's weight is "1642.15"
    And I see that the plane's moment is "66200.42"
    And I see that the plane's arm is "40.313"
