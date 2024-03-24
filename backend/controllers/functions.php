<?php
    function failure(&$response , $error)
    {
        $response["success"] = false;
        $response["error"] = $error;
    }
?>