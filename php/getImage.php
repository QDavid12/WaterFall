<?php  
    //echo "nimei";
    $from = (int)$_GET['from'];
    $to = (int)$_GET['to'];
    //echo $id;
    $data = array();
    $data['from'] = $from;
    $data['to'] = $to;
    for ($i=$from; $i <= $to; $i++) {
        $image = getimagesize("../images/".$i.".jpg");
        $r = array('width'=>$image["0"], 'height'=>$image["1"], 'id'=>$i, 'src'=>"./images/".$i.".jpg");
        $data[$i] = $r;
    }
    echo json_encode($data);