/*modal construction */
/*
modal_1 + {id} + modal_2 + {form} + modal_3
*/





let  modal_1 = `
<!-- Modal -->
<div class="modal fade" id="`;


let  modal_2 =`" tabindex="-1" role="dialog" aria-labelledby="editor_modal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">`;
let modal_3 = `
      </div>
    </div>
  </div>
</div>`
;

function opencourse(c_id) {
    $.ajax({
        type: 'GET',
        url: '/api/opencourse/' + c_id,
        contentType: 'application/json',
        success: function (data) {
            var lectures = data[0];
            var resourses = data[1];
            var firstlecture;
            if(data.response === "no data available"){
                lectures = [];
                resourses = [];
                firstlecture = [{"l_url":"null","l_description":"NO LECTURES ADDED YET!"},]
            }
            else {
                firstlecture = [lectures[0],];
            }
            canvas.innerHTML = `
            <div>
                <style>
                    h1 {
                        font-size: 3rem;
                        font-weight: 50;
                        color: rgb(18, 18, 19);
                        font-family: 'Nunito', sans-serif;
                    }
                </style>
                <div id="course_editor">
                <div class="btn-group m-2" role="group">
                
                ${modal_1}add_lecture${modal_2}
                    <form enctype="multipart/form-data" action="/api/addlecture/" id="add_lecture_form">
                        <input type="hidden" value="${c_id}">
                        
                        <label for="exampleFormControlInput1">Lecture Number</label>
                        <input type="number" required class="form-control" id="exampleFormControlInput1">
                      
                      <div class="form-group">
                        <label for="name">Lecture Name</label>
                        <input type="text" required class="form-control" id="name">
                      </div>
                      <div class="form-group">
                        <label for="video">Video</label>
                        <input type="file" required class="form-control" id="video">
                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlTextarea1">Lecture Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                      </div>
                      <button type="button" onclick="addlecture()" class="btn btn-sm btn-primary">save</button>
                    </form>
                ${modal_3}
                
                
                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#add_lecture">Add Lecture</button>
                <button type="button" class="btn btn-success" onclick="addresource(${c_id})">Add Course Resource</button>
                </div>
                </div>
                <div class="accordion col text-center text-dark" id="accordionE">
                    <div class="card border-0 m-0 p-0">
                        <div class="card-header" id="headingTwo" style="background-color: white">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left collapsed text-center" type="button"
                                    data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                                    aria-controls="collapseTwo">
                                    Courses Resources
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionE">
                            <div class="row">
                            ${resourses.map(function (r) {
                var url;
                if (r.cr_url === null) {
                    url = r.file;
                }
                else {
                    url = r.cr_url;
                }
                return `
                                <div class="card-body">
                                <div class="card" style="width: 18rem; height: 9rem;">
                                  <div class="card-body">
                                    <h5 class="card-title">${r.cr_name}</h5>
                                    <small class="card-text">${r.cr_description}</small><br>
                                       <a href="${url}" target="_blank"><i class="material-icons mb-0 mt-1">launch</i></a>
                                  </div>
                                </div>
                            </div>
                                `;
            }).join('')}
                        </div>
                        </div>
                    </div>
                </div>
            
                <div class="row align-items-center m-1">
                    <div class="col-12 col-xl-8">
                    <style>
                    .contain {
                      position: relative;
                      width: 100%;
                      overflow: hidden;
                      padding-top: 56.25%; /* 16:9 Aspect Ratio */
                    }
                    
                    .responsive-iframe {
                      position: absolute;
                      top: 0;
                      left: 0;
                      bottom: 0;
                      right: 0;
                      width: 100%;
                      height: 100%;
                      border: none;
                    }
                    </style>
                    
                    
                    
                    
                    <div class="contain mt-2 mb-2">
                         <video id = "videoframe" class="responsive-iframe" controls autoplay> <source src="${firstlecture[0].video}" type="video/mp4"> </source> </video>
                    </div>
                    <div class="row p-0" id="lecturefooter">
                        <p>${firstlecture[0].l_description}</p>
                        ${firstlecture[0].video}
                       </div> 
                    </div>
                    <div class="col-12 col-xl-4 mt-2">
                        <table class="table">
                            <thead class="text-dark">
                                <tr class="text-center">
                                    <th>Lectures</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${lectures.map(function (l) {
                var l_url = l.video;
                return `
                                    <tr>
                                        <td>
                                            <button class="btn btn-link border-0 btn-block text-left" onclick="loadlecture('${l_url}','${l.l_description}','${l.id}')"><span style="font-weight: bolder">L: ${l.l_number}</span>
                                            <p>${l.l_name}</p>
                                            </button>
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-info" onclick="addlectureresource('${l.id}')">Add Resource</button>
                                            <button class="btn btn-sm btn-outline-info" onclick="editlecture('${l}')">Edit</button>
                                            <button class="btn btn-sm btn-outline-danger" onclick="deletelecture('${l.id}')">Delete</button>
                                        </td>
                                    </tr>
                                    `;
            }).join('')}  
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
`;

        }
    });
}

function loadlecture(l, description, id) {
    var frame = document.getElementById("videoframe");
    frame.setAttribute("src", l);
    document.getElementById("lecturefooter").innerHTML = `
    <p>${description}</p>
    `;
}




function addlecture(){
    var add = $('#add_lecture_form').serialize();
    console.log(add);
    let data = $("#video");
    var file = data[0].files[0];
    let formData = new FormData();
    formData.append("video", file);
    formData.append("title", l_name);
    formData.append("description", l_des);
    formData.append("number", l_num);
    formData.append("c_id", c_id);
    document.getElementById("add_lecture_form").reset();
    /*$.ajax(
        {
            type: 'POST',
            url: '/api/addlecture/',
            contentType: false,
            processData: false,
            data: formData,
            headers: { "x-csrftoken": csrftoken },
            success: function (data) {
                alert('added');
            },
            error: function (error) {
                console.log(error);
            }
        }
    );*/
}


function addresource(c_id){

}

function submitaddresource(){

}

function addlectureresource(l_id){

}

function submitaddlectureresource(){

}


function deletelecture(l_id){

}

function deletelectureresource(lr_id){

}

function deleteresource(cr_id){

}


function editlecture(l){

}

function submiteditlecture(){

}

function editlectureresource(lr){

}

function submiteditlectureresource(){

}

function editresource(r){

}

function submiteditresource(){

}