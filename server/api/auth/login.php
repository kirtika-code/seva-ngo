<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->email) &&
    !empty($data->password)
) {
    $user->email = $data->email;
    $user->password = $data->password;

    if ($user->login()) {
        http_response_code(200);
        echo json_encode(array(
            "message" => "Login successful.",
            "user" => array(
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "role" => $user->role
            ),
            "token" => $user->token
        ));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid credentials."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to login. Data is incomplete."));
}
?> 