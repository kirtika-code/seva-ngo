<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get event ID from URL
$event_id = isset($_GET['id']) ? $_GET['id'] : die();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get single event
        try {
            $query = "SELECT * FROM events WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":id", $event_id);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $event = $stmt->fetch();
                http_response_code(200);
                echo json_encode($event);
            } else {
                http_response_code(404);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Event not found'
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Error fetching event: ' . $e->getMessage()
            ]);
        }
        break;

    case 'PUT':
        // Update event
        try {
            $data = json_decode(file_get_contents("php://input"));

            if (
                !empty($data->title) &&
                !empty($data->description) &&
                !empty($data->event_date) &&
                !empty($data->location) &&
                !empty($data->max_participants)
            ) {
                $query = "UPDATE events 
                         SET 
                            title = :title,
                            description = :description,
                            event_date = :event_date,
                            location = :location,
                            max_participants = :max_participants,
                            status = :status
                         WHERE id = :id";

                $stmt = $db->prepare($query);

                // Bind values
                $stmt->bindParam(":title", $data->title);
                $stmt->bindParam(":description", $data->description);
                $stmt->bindParam(":event_date", $data->event_date);
                $stmt->bindParam(":location", $data->location);
                $stmt->bindParam(":max_participants", $data->max_participants);
                $stmt->bindParam(":status", $data->status);
                $stmt->bindParam(":id", $event_id);

                if ($stmt->execute()) {
                    // Get the updated event
                    $query = "SELECT * FROM events WHERE id = :id";
                    $stmt = $db->prepare($query);
                    $stmt->bindParam(":id", $event_id);
                    $stmt->execute();
                    $event = $stmt->fetch();

                    http_response_code(200);
                    echo json_encode([
                        'status' => 'success',
                        'message' => 'Event updated successfully',
                        'data' => $event
                    ]);
                } else {
                    throw new Exception("Unable to update event");
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

    case 'DELETE':
        // Delete event
        try {
            // First check if event exists
            $check_query = "SELECT id FROM events WHERE id = :id";
            $check_stmt = $db->prepare($check_query);
            $check_stmt->bindParam(":id", $event_id);
            $check_stmt->execute();

            if ($check_stmt->rowCount() > 0) {
                // Delete related records first
                $delete_related = "DELETE FROM event_volunteers WHERE event_id = :id";
                $stmt = $db->prepare($delete_related);
                $stmt->bindParam(":id", $event_id);
                $stmt->execute();

                // Delete the event
                $query = "DELETE FROM events WHERE id = :id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(":id", $event_id);

                if ($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode([
                        'status' => 'success',
                        'message' => 'Event deleted successfully'
                    ]);
                } else {
                    throw new Exception("Unable to delete event");
                }
            } else {
                http_response_code(404);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Event not found'
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
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