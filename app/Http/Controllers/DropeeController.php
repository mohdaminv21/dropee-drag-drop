<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Dropee;

class DropeeController extends Controller
{
    public function index() {
        $elements = Dropee::all();
        $array_elements = [];
        $table = new \stdClass();
        $table->rows = 0;
        $table->columns = 0;
        $table->coordinates = [];
        $table->text = [];
        $table->color = [];
        $table->style = [];
        $table->tableId = [];
        $arrayTable = [];

        // Change collection type tp array type
        foreach($elements as $element){
            array_push($array_elements, $element) ;
        }
        
        $rows = array_column($array_elements, 'row'); 
        $columns = array_column($array_elements, 'column'); 
        sort($rows);
        sort($columns);
        $table->rows = end($rows);
        $table->columns = end($columns);
        $table->cells = $table->rows * $table->columns;

        // Arrange the table, give default value
        for($i = 1; $i < $table->rows+1; $i++) {
            for($j = 1; $j < $table->columns+1; $j++) {
                array_push($table->coordinates, $i."|".$j);
                array_push($table->text, '');
                array_push($table->style, '');
                array_push($table->color, '');
                array_push($table->tableId, '');
            }
        }

        // Assign attributes to cells
        foreach($array_elements as $element){
            $key = array_search($element->row."|".$element->column, $table->coordinates); 
            $table->text[$key] = $element->text;
            $table->style[$key] = $element->style;
            $table->color[$key] = $element->color;
            $table->tableId[$key] = $element->id;
        }

        // Combine everything
        for ($i = 0; $i < $table->cells; $i++) {
            $cell = new \stdClass();
            $cell->coordinates = $table->coordinates[$i];
            $cell->text = $table->text[$i];
            $cell->style = $table->style[$i];
            $cell->color = $table->color[$i];
            $cell->tableId = $table->tableId[$i]; 
            $cell->bgcolor = "background-color:#e1e9f5;";

            $inlineStyle = array_map('trim', explode(';', $cell->style));
            $bgcolor = array_filter($inlineStyle, function($st){
                return strpos($st, 'background') !== false;
            });

            if(count($bgcolor)>0) {
                $cell->bgcolor = $bgcolor[0];
            }
            array_push($arrayTable, $cell);
        }
        return view('pages.dropee')->with('tables', $arrayTable);
    }

    public function set(Request $request) {
        $insert = $request->input('insert');
        $update = $request->input('update');
        $createdId = [];

        // return response()->json([
        //     'status' => 'success',
        //     'insert' => (array)$insert[0]
        // ]);

        if($insert) {
            if(!is_array($insert)) {
                $insert = [];
            }            
        }
        else {
            $insert = [];
        }

        if($update) {
            if(!is_array($update)) {
                $update = [];
            }            
        }
        else {
            $update = [];
        }

        if(count($insert) || count($update)) {
            if(count($insert)) {
                foreach($insert as $data){
                    $data = (array) $data;
                    $newId = self::insert($data);
                    array_push($createdId, $newId);
                }
            }      
            
            if(count($update)) {
                $dropee = self::update($update);
            }  

            return response()->json([
                'status' => 'success',
                'createdId' => $createdId
            ]);
        }
        else {
            return response()->json([
                'status'=> 'fail',
                'error' => 'Parameters invalid'
            ]);
        }        
    }

    private function insert($data) {
        $dropee = Dropee::create($data);

        return $dropee->id;
    }

    private function update($dataset) {
        foreach($dataset as $data){   
            $data = (object)$data;                 
            $dropee = Dropee::find($data->id);
            $dropee->text = $data->text;
            $dropee->row = (int)$data->row;
            $dropee->column = (int)$data->column;
            $dropee->color = $data->color;
            $dropee->style = $data->style;
            $dropee->save();
        }

        return;
    }

}


