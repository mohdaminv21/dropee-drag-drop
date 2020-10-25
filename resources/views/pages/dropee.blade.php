@extends('layouts.app')

@section('content')
    
    <section id="loader"> 
        <div id="loading"></div>
        <div id="loading-content"></div>    
    </section>
    <h1>Welcome to Dropee</h1>

    @if(count($tables) > 0) 
        <div class="instruction">
            <ul>
                <li>
                    To rearrange the words, simply drag and dropee
                </li>
                <li>
                    To insert new, change text and styling please double click on the box.
                </li>
            </ul>
        </div>
        <div class="grid-container">            
            @foreach($tables as $key => $table)
                @php
                    if($table->color !== '') {
                        $style = 'color:'.$table->color.';'; 
                    }
                    else {
                        $style = '';
                    }
                    if($table->style !== '') {
                        $style = $style.$table->style;
                    }
                @endphp

                <div id="element{{$key}}" class="grid-item" draggable="true" data-key="{{$key}}" style="{{$table->bgcolor}}">
                    <p class="draggable" id="text{{$key}}" style="{{$style}}" data-coordinate="{{ $table->coordinates}}">{{ $table->text }}</p>
                </div>
            @endforeach

            
            <div class="modal fade" id="edit-modal" tabindex="-1" role="dialog" aria-labelledby="edit-modal-label" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="edit-modal-label">Edit Data</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="attachment-body-content">
                        <div class="card text-dark bg-light mb-0">
                            <div class="card-body">
                                <div>
                                    <input type="hidden" name="index" id="index" required>
                                    <input type="hidden" name="tableId" id="tableId" required>
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label" for="modal-input-name">Text</label>
                                    <input type="text" name="text" class="form-control" id="text" required autofocus>
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label" for="modal-input-description">Color</label>
                                    <input type="text" name="modal-input-description" class="form-control" id="color" required>
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label" for="modal-input-name">Style</label>
                                    <input type="text" name="style" class="form-control" id="style" required autofocus>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="btnSave" class="btn btn-primary" data-dismiss="modal">Save</button>
                        <button type="button" id="btnCancel" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    @else
        <p> No table data found
    @endif
    

@endsection

<script>
var tables = <?php echo json_encode($tables); ?>
</script>
<script type="text/javascript" src="{{asset('js/dropee.js')}}" defer></script>