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
    !empty($data->first_name) &&
    !empty($data->last_name) &&
    !empty($data->email) &&
    !empty($data->password) &&
    !empty($data->role) &&
    !empty($data->phone) &&
    !empty($data->city) &&
    !empty($data->state) &&
    !empty($data->pincode)
) {
    $user->name = $data->first_name . ' ' . $data->last_name;
    $user->email = $data->email;
    $user->password = $data->password;
    $user->role = $data->role;
    $user->first_name = $data->first_name;
    $user->last_name = $data->last_name;
    $user->phone = $data->phone;
    $user->address = $data->address ?? '';
    $user->city = $data->city;
    $user->state = $data->state;
    $user->country = $data->country ?? 'India';
    $user->pincode = $data->pincode;
    $user->skills = $data->skills ?? '';
    $user->availability = $data->availability ?? '';

    if ($user->register()) {
        http_response_code(201);
        echo json_encode(array(
            "message" => "User registered successfully.",
            "user" => array(
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "role" => $user->role,
                "phone" => $user->phone,
                "city" => $user->city,
                "state" => $user->state,
                "country" => $user->country
            ),
            "token" => $user->token
        ));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to register user."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to register. Required fields are missing."));
}
?> 