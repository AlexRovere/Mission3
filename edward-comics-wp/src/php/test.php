<?php
require 'connect.php';

print_r(json_encode($woocommerce->get('products', ['per_page' => 100]))); 


?>
