<?php
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: X-Requested-With");
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');
header("Content-Type:application/json");

	require_once "config.php";
    require_once "database.php";


if($_SERVER['REQUEST_METHOD'] == 'GET')
	{
		perfil();
		
	}
else{
	response(400,"Invalid Request",NULL);
}

function perfil(){
	$DBConect= new Database();
	$usename= $_GET['usuario'];
	
	$sql= 'SELECT usuario, perfil FROM usuario where usuario ='.'"'.$usename.'"';
	$result= $DBConect->mysqli->query($sql);
		$cont=0;

		if ($result->num_rows > 0) {
			while ($row= $result->fetch_assoc()) {
				$profile['perfil']= utf8_encode($row['perfil']);
				$profile['usuario']= utf8_encode($row['usuario']);
				
				$profiles[$cont]=$profile;
				$cont++;



			}
			response(200,"VIDEOS",$profiles);
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
