Feature: Register a new user
  In order to have courses in the platform
  As a user with admin permissions
  I want to create a new course

  Scenario: A valid register user
    Given I send a POST request to "/signup" with body:
    """
    {
      "username": "marmoler",
      "email": "perole@gmail.com",
      "password": "VicentTango24$"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: A non valid register user
    Given I send a POST request to "/signup" with body:
    """
    {
      "username": "tangoler",
      "email": "perole@gmail.com",
      "password": "VicentTango24"
    }
    """
    Then the response status code should be 422

  Scenario: Register user already registered
    Given I send a POST request to "/signup" with body:
    """
    {
      "username": "tangoler",
      "email": "perole@gmail.com",
      "password": "VicentTango24$"
    }
    """
    Then the response status code should be 409
