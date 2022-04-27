<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$jsonString = file_get_contents('data.json');
$data = json_decode($jsonString, true);
foreach ($data as $key => $value) 
{
   
    
        $date_today = new DateTime();
    	$date_approved = date("Y-m-d h:i:sa") ;

        $data[$key]['status'] = $pullStatus;
        $data[$key]['date_approved'] = $date_approved;
         $data[$key]['date_credited'] = '';


    
    

}

file_put_contents('data.json', json_encode($data, true));

return $data;
?>