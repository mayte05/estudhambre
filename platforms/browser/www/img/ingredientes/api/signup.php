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
		signup();
		
	}
else{
	response(400,"Invalid Request",NULL);
}

function signup(){
	$DBConntect= new Database();
	$fullname= $_POST['nombre'];
	$usename= $_POST['usuario'];
	$email=$_POST['Email'];
	$contrasena= $_POST['password'];
	$data = $fullname;
	$stmt = $DBConntect->mysqli->prepare("INSERT INTO usuario (usuario,nombrecompleto,email,password) VALUES (?,?,?,?); ");
	$stmt->bind_param('ssss',$usename,$fullname,$email,$contrasena);
	$r=$stmt->execute();
		response (200,"usuario Registrado",$data);

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
