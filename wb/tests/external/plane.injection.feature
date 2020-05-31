Feature: Plane injection

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
    When I access the home page with flight info "eyJwbGFuZSI6IkNHU0RaIiwiZnJvbnQtc2VhdC1sZWZ0IjoxMCwiZnJvbnQtc2VhdC1yaWdodCI6MjAsImJhY2stc2VhdC1sZWZ0IjozMCwiYmFjay1zZWF0LXJpZ2h0Ijo0MCwiZ2FsbG9ucyI6NTAsInRhbmsiOjMwMCwiYmFnZ2FnZS0xIjo2MCwiYmFnZ2FnZS0yIjo3MH0="
    Then the selected plane is "CGSDZ"
    And I see that the plane's weight is "1509.1"
    Then I see that the weight of station "front-seat-left" is "10"
    Then I see that the weight of station "front-seat-right" is "20"
    Then I see that the weight of station "back-seat-left" is "30"
    Then I see that the weight of station "back-seat-right" is "40"
    Then I see that the weight of station "tank" is "300"
    Then I see that the weight of station "baggage-1" is "60"
    Then I see that the weight of station "baggage-2" is "70"
    Then I see the "tank" loading line from origin to "44,23" with mark at "41,27"
