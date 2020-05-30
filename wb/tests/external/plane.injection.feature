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
    When I access the home page with flight info "eyJwbGFuZSI6IkNHU0RaIn0="
    Then the selected plane is "CGSDZ"
