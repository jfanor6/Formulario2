<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	/*define("HOSTNAME", "localhost");
	define("DATABASE", "prueba_tecnica_dev");      
	define("USERNAME", "root");    
	define("PASSWORD", "");      

	$mysqli = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE);*/
	
	define("HOSTNAME", "104.156.58.29");
	define("DATABASE", "impulsar_prueba_tecnica_dev");      
	define("USERNAME", "root");    
	define("PASSWORD", "");      

	$mysqli = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE);
		





?>