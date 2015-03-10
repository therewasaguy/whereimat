<html>
  <head>
    <title>database</title>
  </head>
  <body>

<?PHP
  header("Access-Control-Allow-Origin: *");


    $data = $_POST['dataString'];

    // get database.json
    $data_pre = file_get_contents('database.json');
    $data_arrayless = substr($data_pre, 1, -1);
    // $tempArray = json_decode($data_arrayless, true);
    // array_push($tempArray, $data);

    // $data_post = json_encode($tempArray);

    // save the data to the database.json
    $fp = fopen('database.json', 'w');
    fwrite($fp, '[' . $data_arrayless . ', ' . $data . ']');

    fclose($fp);
?>
</body>
</html>