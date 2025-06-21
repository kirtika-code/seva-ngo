<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all events
        try {
            $query = "SELECT * FROM events ORDER BY event_date DESC";
            $stmt = $db->query($query);
            $events = $stmt->fetchAll();

            http_response_code(200);
            echo json_encode($events);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Error fetching events: ' . $e->getMessage()
            ]);
        }
        break;

    case 'POST':
        // Create new event
        try {
            $data = json_decode(file_get_contents("php://input"));

            if (
                !empty($data->title) &&
                !empty($data->description) &&
                !empty($data->event_date) &&
                !empty($data->location) &&
                !empty($data->max_participants)
            ) {
                $query = "INSERT INTO events 
                         (title, description, event_date, location, max_participants, status, created_by) 
                         VALUES 
                         (:title, :description, :event_date, :location, :max_participants, :status, :created_by)";

                $stmt = $db->prepare($query);

                // Bind values
                $stmt->bindParam(":title", $data->title);
                $stmt->bindParam(":description", $data->description);
                $stmt->bindParam(":event_date", $data->event_date);
                $stmt->bindParam(":location", $data->location);
                $stmt->bindParam(":max_participants", $data->max_participants);
                $stmt->bindParam(":status", $data->status);
                $stmt->bindParam(":created_by", $data->created_by);

                if ($stmt->execute()) {
                    $event_id = $db->lastInsertId();
                    
                    // Get the created event
                    $query = "SELECT * FROM events WHERE id = :id";
                    $stmt = $db->prepare($query);
                    $stmt->bindParam(":id", $event_id);
                    $stmt->execute();
                    $event = $stmt->fetch();

                    http_response_code(201);
                    echo json_encode([
                        'status' => 'success',
                        'message' => 'Event created successfully',
                        'data' => $event
                    ]);
                } else {
                    throw new Exception("Unable to create event");
                }
            } else {
                throw new Exception("Required fields are missing");
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode([
            'status' => 'error',
            'message' => 'Method not allowed'
        ]);
        break;
}
?> 