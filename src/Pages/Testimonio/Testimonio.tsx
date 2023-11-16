import './testimonio.css';


export const Testimonio = () =>{
  return (
    <div className="Testimonio">

      <div>
      <h2 className="h1-responsive font-weight-bold text-center my-4">Testimonios</h2>
      <p className="text-center w-responsive mx-auto mb-5">Aca podras encontrar las opiniones de otros usuarios
      y agregar las tuyas.</p>
      </div>

<div className="row d-flex justify-content-center">
  <div className="col-md-8 col-lg-6">
    <div className="card shadow-0 border recuadroTestimonios" /*style="background-color: #f0f2f5;"*/>
      <div className="card-body p-4">
        <div className="form-outline mb-4">
          <input type="text" id="addANote" className="form-control" placeholder="Type comment..." />

          <button type="submit" className="btn btn-primary">+ Add a note</button>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <p>Type your note, and hit enter to add it</p>

            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp" alt="avatar" width="25"
                  height="25" />
                <p className="small mb-0 ms-2">Martha</p>
              </div>
              <div className="d-flex flex-row align-items-center">
                <p className="small text-muted mb-0">Upvote?</p>
                <i className="far fa-thumbs-up mx-2 fa-xs text-black" /*style="margin-top: -0.16rem;"*/></i>
                <p className="small text-muted mb-0">3</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <p>Type your note, and hit enter to add it</p>

            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar" width="25"
                  height="25" />
                <p className="small mb-0 ms-2">Johny</p>
              </div>
              <div className="d-flex flex-row align-items-center">
                <p className="small text-muted mb-0">Upvote?</p>
                <i className="far fa-thumbs-up mx-2 fa-xs text-black" /*style="margin-top: -0.16rem;"*/></i>
                <p className="small text-muted mb-0">4</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <p>Type your note, and hit enter to add it</p>

            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp" alt="avatar" width="25"
                  height="25" />
                <p className="small mb-0 ms-2">Mary Kate</p>
              </div>
              <div className="d-flex flex-row align-items-center text-primary">
                <p className="small mb-0">Upvoted</p>
                <i className="fas fa-thumbs-up mx-2 fa-xs" /*style="margin-top: -0.16rem;"*/></i>
                <p className="small mb-0">2</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p>Type your note, and hit enter to add it</p>

            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar" width="25"
                  height="25" />
                <p className="small mb-0 ms-2">Johny</p>
              </div>
              <div className="d-flex flex-row align-items-center">
                <p className="small text-muted mb-0">Upvote?</p>
                <i className="far fa-thumbs-up ms-2 fa-xs text-black" /*style="margin-top: -0.16rem;"*/></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>

  );
}
