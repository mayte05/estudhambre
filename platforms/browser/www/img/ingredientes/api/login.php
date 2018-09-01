<?php
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: X-Requested-With");
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');
header("Content-Type:application/json");


require_once "config.php";
    require_once "database.php";

	if($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		getlogin();
		
	}
	else{
		response(400,"Invalid Request",NULL);
	}

function getlogin(){
	$DBConect= new database();
		$username=$_POST['usuario'];
		$password=$_POST['password'];
		$sql= 'SELECT usuario, password FROM usuario where usuario ='.'"'.$username.'" AND ' .'password='.'"'.$password.'"';
		
		//$result es lo que se va a comparar, la base de datos nos dará un reusltado y este nos da algo es porque existe un registro
		$result= $DBConect->mysqli->query($sql);

		if ($result->num_rows > 0) {
			while ($row= $result->fetch_assoc()) {
				$data= "Autenticado";
			}
			response(200,"Usuario Existe",$data);
		}else{
			response(200,"Usuario o password no existe", "ERROR_ACCESO");

		}


}


function response($status,$status_message,$data)
	{
		header("HTTP/1.1 ".$status);
		
		$response['status']=$status;
		$response['status_message']=$status_message;
		$response['data']=$data;
		
		$json_response = json_encode($response);
		echo $json_response;
		//echo $response;

	}

?>