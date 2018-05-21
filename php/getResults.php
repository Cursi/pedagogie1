<?php
    class UserResult
    {
        public $username;
        public $result;

        function __construct($username, $result)
        {
            $this->username = $username;
            $this->result = $result;
        }
    }

    require_once("connection.php");

    $result = mysqli_query($db, "SELECT username, result from data_table");
    $results = (array)mysqli_fetch_all($result, MYSQLI_ASSOC);

    $resultsArray = [];

    foreach($results as &$result)
    {
      $userResult = new UserResult( $result["username"], $result["result"]);
      array_push($resultsArray, $userResult);
    }

    $encodedJson = json_encode($resultsArray);
    echo $encodedJson;

    mysqli_close($db);
?>
