<?php 
    include("con_db.php");
	
	 //echo print_r($_POST,true);  exit;

   /* if($mysqli){

        echo "Conexion establecida";

    }else{

        echo"Error al conectar"; 

    }*/

    if($_POST['modo'] == 'insertar'){

            $nombre = trim($_POST['nombre']);
			$correo = trim($_POST['correo']);
			$sexo2 = trim($_POST['sexo2']);
            $area = trim($_POST['area']);            
            $observacion = trim($_POST['observacion']);
            $boletin = trim($_POST['boletin']);
            
			if ($boletin == ""){
				$boletin = 0;
			}
			
			
			//inserta tabla empleado
            $sql = "INSERT INTO empleado (nombre,email,sexo, area_id, boletin, descripcion) 
            VALUES ('".$nombre."','".$correo."','".$sexo2."',".$area.",".$boletin.",'".$observacion."')";
        	
			$result = $mysqli -> query($sql);				
			
			
            if($result = true){
				
                echo json_encode(array('message'=> 'Guardado'));
				
								
            }else{
				echo json_encode(array('message'=> 'Error al guardar'));
			} 

			
    }
	
	if($_POST['modo'] == 'editar'){

            $idmod = trim($_POST['idmod']);
            $nombre = trim($_POST['nombre']);
			$correo = trim($_POST['correo']);
			$sexo2 = trim($_POST['sexo2']);
            $area = trim($_POST['area']);            
            $observacion = trim($_POST['observacion']);
            $boletin = trim($_POST['boletin']);
            
			if ($boletin == ""){
				$boletin = 0;
			}
			
			
			//edita tabla empleado
			
            $sql = "UPDATE empleado SET nombre = '".$nombre."' ,email= '".$correo."',sexo= '".$sexo2."', area_id=".$area.", boletin=".$boletin.", descripcion='".$observacion."' 
					WHERE id= ".$idmod." ";    
        	
			$result = $mysqli -> query($sql);				
			
			
            if($result = true){
				
                echo json_encode(array('message'=> 'Guardado'));
				
								
            }else{
				echo json_encode(array('message'=> 'Error al guardar'));
			} 

			
    }
	
	//Modificar los roles del empleado	
	if($_POST['modo'] == 'editarrol'){	
	//modifica tabla empleado rol con el id en la tabla de mysql
			$sql1 = "DELETE FROM empleado_rol WHERE empleado_id = ".$_POST['idmod'].""; 
			$result1 = $mysqli -> query($sql1);
						
			//echo print_r($_POST['id']);
			
			$cod = substr($_POST['id'],4);
			
		if (($cod != 'tin')||($cod != "")){
			
			$sql2 = "INSERT INTO empleado_rol (empleado_id,rol_id) VALUES (".$_POST['idmod'].",".$cod.");";
			
			//echo "$sql2";  
			
        	$result2 = $mysqli -> query($sql2);
			
			$cod = "";
			$sql2 = "";
			
			 if($result2 = true){
				
                echo json_encode(array('message'=> 'Guardado'));
				
								
            }else{
				echo json_encode(array('message'=> 'Error al guardar los roles'));
			}

		}	
	
	}
	
	
	//insertar roles a empleado	
	if($_POST['modo'] == 'insertarrol'){	
	//inserta tabla empleado rol con el ultimo id ingresado en la tabla de mysql
			$sql2 = "SELECT MAX(id) as cons FROM empleado";
			$result2 = $mysqli -> query($sql2);
						
			while($row = $result2 -> fetch_array(MYSQLI_ASSOC))
                   {
                       $data2[] = array(
						   'cons'   => $row['cons'],						   
                        );
                        
                   }
			//echo print_r($_POST['id']);
			
			$cod = substr($_POST['id'],4);
			
		if (($cod != 'tin')||($cod != "")){
			
			$sql2 = "INSERT INTO empleado_rol (empleado_id,rol_id) VALUES (".$data2[0]['cons'].",".$cod.");";
			
			//echo "$sql2";  
			
        	$result2 = $mysqli -> query($sql2);
			
			$cod = "";
			$sql2 = "";
			
			 if($result2 = true){
				
                echo json_encode(array('message'=> 'Guardado'));
				
								
            }else{
				echo json_encode(array('message'=> 'Error al guardar los roles'));
			}

		}	
	
	}
	
	//consultas areas
	
	if($_POST['modo'] == 'consultarareas'){
		$sql = "SELECT * FROM areas ";        	
			$result = $mysqli -> query($sql);
			
			while($row = $result -> fetch_array(MYSQLI_ASSOC))
                   {
                       $data4[] = array(
						   'id'   => $row['id'],
                           'nombre'   => $row['nombre'],
						   
                        );
                        
                   }
			echo json_encode($data4);
		
	
	}
	
	//consulta roles de empleados
	
	if($_POST['modo'] == 'consultarrol'){
		$sql = "SELECT * FROM roles ";        	
			$result = $mysqli -> query($sql);
			
			while($row = $result -> fetch_array(MYSQLI_ASSOC))
                   {
                       $data[] = array(
						   'id'   => $row['id'],
                           'nombre'   => $row['nombre'],
						   
                        );
                        
                   }
			echo json_encode($data);
		
	
	}
	
	//consulta empleados creados
	
	if($_POST['modo'] == 'consultar'){
		$sql = "SELECT
					em.id,
					em.nombre,
					em.email,
					case when em.sexo = 'M' then 'Masculino' else 'Femenino' end as sexo,
					em.area_id,
					case when em.boletin = '1' then 'Si' else 'No' end as boletin,
					em.descripcion,
					a.nombre as Area
					FROM empleado as em

					INNER JOIN areas as a
										ON a.id = em.area_id;";        	
			$result = $mysqli -> query($sql);
			
			while($row = $result -> fetch_array(MYSQLI_ASSOC))
                   {
                       $data[] = array(
						   'id'   => $row['id'],
                           'nombre'   => $row['nombre'],
                           'email'   => $row['email'],
                           'sexo'   => $row['sexo'],
                           'area_id'   => $row['area_id'],
                           'boletin'   => $row['boletin'],
                           'descripcion'   => $row['descripcion'],
                           'area'   => $row['Area'],						   

                        );
                        
                   }
			echo json_encode($data);
		
	
	}
	
	
	//seleccionar empleado por id
	if($_POST['modo'] == 'seleccionar'){
	
	
		$sql = "SELECT * FROM empleado WHERE id= ".$_POST['id']."";        	
			$result = $mysqli -> query($sql);
			
			while($row = $result -> fetch_array(MYSQLI_ASSOC))
                   {
                       $data[] = array(
						   'id'   => $row['id'],
                           'nombre'   => $row['nombre'],
                           'email'   => $row['email'],
                           'sexo'   => $row['sexo'],
                           'area_id'   => $row['area_id'],
                           'boletin'   => $row['boletin'],
                           'descripcion'   => $row['descripcion'],

                        );
                        
                   }
			echo json_encode($data);
		
	
	}
	
	//Eliminar empleado por id
	if($_POST['modo'] == 'eliminar'){
	
	
		$sql = "SELECT * FROM empleado WHERE id= ".$_POST['id']."";        	
			$result = $mysqli -> query($sql);
			
		if($result = true){
			
			//inserta tabla empleado
            $sql2 = "DELETE FROM empleado WHERE id= ".$_POST['id'].""; 
        	
			$result2 = $mysqli -> query($sql2);	
				
            echo json_encode(array('message'=> 'eliminado'));
				
								
		}else{
			echo json_encode(array('message'=> 'Error al eliminar empleado'));
		} 
		
	
	}
	
	
	//seleccionar los roles que tiene el empleado por id
	
	if($_POST['modo'] == 'seleccionarrol'){
	
	
		$sql = "SELECT r.id,r.nombre FROM empleado_rol as er
					INNER JOIN roles as r
					ON r.id = er.rol_id
				WHERE er.empleado_id= ".$_POST['id']."";      
				
			$result = $mysqli -> query($sql);
			
			while($row = $result -> fetch_array(MYSQLI_ASSOC))
                   {
                       $data[] = array(
						   'id'   => $row['id'],
                           'nombre'   => $row['nombre'],

                        );
                        
                   }
			echo json_encode($data);
		
	
	}
	
	

?>