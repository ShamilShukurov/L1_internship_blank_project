<?php

include_once "config.php";
$link = $connection->prepare("SELECT Weather.* , Wind_Direction.Wind_Direction , Day.Day FROM Weather INNER JOIN Wind_Direction ON Weather.Wind_DirectionID = Wind_Direction.Wind_DirectionID INNER JOIN Day ON Weather.DayID = Day.DayID ORDER BY DATE");
$link->execute();
$result = $link->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Cairo&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.6/css/responsive.dataTables.min.css">
    <link rel="stylesheet" href="styles/main.css">
    <title>Home</title>
</head>

<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-dark shadow">
            <a class="navbar-brand" href="index.php"><img src="assets/logo.png" alt="logo"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active ml-sm-4">
                        <a class="nav-link" href="index.php">HOME</a>
                    </li>
                    <li class="nav-item ml-sm-4">
                        <a class="nav-link" href="analysis.php">ANALYSIS</a>
                    </li>
                    <li class="nav-item ml-sm-4">
                        <a class="nav-link" href="add.php">ADD</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <main>
        <?php
$today = true;
foreach ($result as $row) {
    if ($today) {
        echo
            "<section class='today'>
                <h2>TODAY</h2>
                <h1>" . $row['Temperature'] . "</h1>
            <div class='values'>
                <div>
                    <p><span class='property'>Temperature:</span> " . $row['Temperature'] . " C</p>
                    <p><span class='property'>Wind speed:</span> " . $row['Wind_Speed'] . " km/h</p>
                    <p><span class='property'>Precipitation:</span> " . $row['Precipitation'] . " %</p>
                </div>
                <div>
                    <p><span class='property'>Humidity:</span> " . $row['Humidity'] . " %</p>
                    <p><span class='property'>Pressure:</span> " . $row['Barometric_Pressure'] . " Pa</p>
                    <p><span class='property'>Wind direction:</span> " . $row['Wind_Direction'] . "</p>
                </div>
            </div>
        </section>

        <table class='table' class='display nowrap' cellspacing='0' width='100%'>
            <thead>
                <tr>
                    <th scope='col'>Date</th>
                    <th scope='col'>Time</th>
                    <th scope='col'>Temperature</th>
                    <th scope='col'>Pressure</th>
                    <th scope='col'>Humidity</th>
                    <th scope='col'>Wind Speed</th>
                    <th scope='col'>Wind Direction</th>
                    <th scope='col'>Precipitation</th>
                    <th scope='col'></th>
                    <th scope='col'></th>
                </tr>
            </thead>
        <tbody>";
        $today = false;
    }
    echo '<tr>';
    echo "
                <th scope='row'>" . $row['DATE'] . "</th>
                <td>" . $row['TIME'] . "</td>
                <td>" . $row['Temperature'] . " C</td>
                <td>" . $row['Barometric_Pressure'] . " Pa</td>
                <td>" . $row['Humidity'] . "%</td>
                <td>" . $row['Wind_Speed'] . " km/h</td>
                <td>" . $row['Wind_Direction'] . "</td>
                <td>" . $row['Precipitation'] . "</td>
                <td>
                    <a class='button' href='edit.php?id=" . $row['ID'] . "'>EDIT</a>
                </td>
                <td>
                    <a class='button' id='red' href='delete.php?id=" . $row['ID'] . "'>DEL</a>
                </td>
                ";
    echo '</tr>';
}

?>
        </tbody>
        </table>
    </main>
    <footer>
        <nav class="navbar navbar-dark shadow">
            <p>Copyright. All right reserved</p>
            <p>©2020</p>
        </nav>
    </footer>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
    </script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.js">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script>
    $(document).ready(function() {
        $('.table').DataTable({
            responsive: true
        });
    });
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
    <script src="https://cdn.datatables.net/responsive/2.2.6/js/dataTables.responsive.js">
    </script>
    <script src="https://cdn.datatables.net/rowgroup/1.1.2/js/dataTables.rowGroup.min.js"></script>
</body>

</html>