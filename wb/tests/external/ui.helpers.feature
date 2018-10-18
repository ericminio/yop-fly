Feature: Plane selection

Scenario: First plane is selected by default
    Given the following planes:
        """
            {
                name: 'CGSAM',
                weight: 1642.15,
                moment: 66200.42
            }
        """
    When I access the home page

    Then I see that the field for plane's weight contains "1642.15"
    Then I see that the field for plane's moment contains "66200.42"
    Then I see that the field for plane's arm contains "40.313"

    When I change the plane's weight to "1700.00"
    Then I see that the field for plane's arm contains "38.941"

    When I change the plane's moment to "66500.00"
    Then I see that the field for plane's arm contains "39.118"
