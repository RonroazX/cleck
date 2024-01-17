Feature: Create a new course
  In order to have courses in the platform
  As a user with admin permissions
  I want to create a new course

  Scenario: A valid non existing course
    Given I send a PUT request to "/courses/22c8fdeb-e759-4444-ae11-441a8f47efac" with body:
    """
    {
      "id": "22c8fdeb-e759-4444-ae11-441a8f47efac",
      "name": "The best course 2",
      "duration": "5 hours"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: A valid non existing course
    Given I send a PUT request to "/courses/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
      "name": 5,
      "duration": "5 hours"
    }
    """
    Then the response status code should be 422
