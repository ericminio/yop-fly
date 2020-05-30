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
                name: 'CGSDZ',
                type: '172s',
                weight: 1509.1,
                moment: 65080.81
            }
        """

Scenario: Select injected plane
    When I access the home page with flight info "eyJwbGFuZSI6IkNHU0RaIiwiZnJvbnQtc2VhdC1sZWZ0IjoxMCwiZnJvbnQtc2VhdC1yaWdodCI6MjAsImJhY2stc2VhdC1sZWZ0OiI6MzAsImJhY2stc2VhdC1yaWdodCI6NDAsImdhbGxvbnMiOjUwLCJ0YW5rIjozMDAsImJhZ2dhZ2UtMSI6NjAsImJhZ2dhZ2UtMiI6NzB9"
    Then the selected plane is "CGSDZ"
    Then I see that the fuel's weight is "300"
