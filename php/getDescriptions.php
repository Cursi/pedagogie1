<?php
    class Image
    {
        public $description;
        public $isAI;

        function __construct($description, $isAI)
        {
            $this->description = $description;
            $this->isAI = $isAI;
        }
    }

    require_once("connection.php");

    if (isset($_POST["imageURL"]))
    {
        $result = mysqli_query($db, "SELECT description from data_table WHERE username != '". $_SESSION["userName"] . "'");
        $descriptions = (array)mysqli_fetch_all($result, MYSQLI_ASSOC);
        
        $imageArray = [];
        
        for($i=0; $i <count($descriptions); $i++)
        {
            $item = $descriptions[$i]["description"];
            $decodedJson = json_decode($item, true);
            
            foreach($decodedJson as &$subItem)
            {
                if($subItem["src"] == $_POST["imageURL"])
                {
                    $image = new Image($subItem["description"], 0);
                    array_push($imageArray, $image);
                } 
            }
        }
        
        require_once("caption.php");
        $image = new Image($aiDescription, 1);
        array_push($imageArray, $image);
        
        $encodedJson = json_encode($imageArray);
        echo $encodedJson;
    }

    mysqli_close($db);
    ?>