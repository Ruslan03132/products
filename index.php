<!-- Подключаемся к бд и создаем переменную выборки всех данных из бд -->
<?php
    require("connect.php");
    $selectContent = "select * from products";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href = "style.css" rel = "stylesheet">
    <title>Товары электроники</title>
</head>
<body>
    <!-- Добавляем контейнер для центрирования содержимого -->
    <div class = "container">
        <!-- Добавляем заголовок и контейнер для поиска -->
        <h1 class = "head">Товары электроники</h1>
        <div class = "searchContainer">
            <label for = "search">Найти товар по имени:</label><br>
            <input class = "search" type = "search" name = "search" id = "search" placeholder="Название">
        </div>
        <!-- Верстаем таблицу -->
        <table>
            <thead>
                <!-- Верстаем заголовок таблицы, в цене добавляем селект для сортировки -->
                <tr>
                    <th>Номер</th>
                    <th>Модель</th>
                    <th>Тип</th>
                    <th>Название</th>
                    <th>
                        Цена:
                        
                        <select name="price" class = "filter">
                            <option selected>по умолчанию</option>
                            <option>по возрастанию</option>
                            <option>по убыванию</option>
                        </select>
                    </th>
                </tr>
            </thead>
            
            <tbody>
                <!-- Тело таблицы заполняем циклом foreach -->
                <?php
                // Делаем sql запрос к бд на выборку всех строк таблицы 
                    $result = mysqli_query($connection, $selectContent);
                    // Приводим объект mysqli_result к массиву
                    $products = mysqli_fetch_all($result);
                    
                    // Для каждого элемента верстаем строку таблицы, для этого внутри цикла разрываем php код
                    foreach ($products as $product){
                        ?>

                        <tr>
                            <td class = "id"><?= $product[0] ?> </td>
                            <td class = "model"><?= $product[1] ?> </td>
                            <td class = "type"><?= $product[2] ?> </td>
                            <td class = "name"><?= $product[3] ?> </td>
                            <td class = "price"><?= $product[4] ?> рублей</td>
                        </tr>
                        
                        <?php
                    }
                ?>
            </tbody>
            
        </table>
        <button class="upButton hidden" type="button">
            ↑
        </button>
        <div class = "notFound hidden">
            Товаров с таким названием не существует!
        </div>
    </div>
    <!-- Подключем скрипт сортировки товаров по цене и фильтрации их по названию -->
    <script src = "index.js"></script>
</body>
</html>