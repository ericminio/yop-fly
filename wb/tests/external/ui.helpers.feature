Feature: Ui helpers

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
    Given The selected plane is "CGSAM"
    Given I see that the plane's weight is "1642.15"
    Given I see that the plane's moment is "66200.42"
    Given I see that the plane's arm is "40.313"

Scenario: Live update of plane's arm
    When I change the plane's weight to "1700.00"
    Then I see that the plane's arm is "38.941"

    When I change the plane's moment to "66500.00"
    Then I see that the plane's arm is "39.118"

Scenario: Live update of fuel weight
    When I change the fuel's volume to "30"
    Then I see that the fuel's weight is "180"
