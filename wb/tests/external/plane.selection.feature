Feature: Plane selection

Scenario: First plane is selected by default
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
    When I access the home page

    Then I see that the only planes that can be selected are:
        """
            CGSAM
            CGINH
        """
    Then I see that the field for plane's weight contains "1642.15"
    Then I see that the field for plane's moment contains "66200.42"
    Then I see that the field for plane's arm contains "40.313"
