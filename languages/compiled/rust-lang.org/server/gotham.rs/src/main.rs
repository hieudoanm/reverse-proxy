use gotham::prelude::*;
use gotham::router::{Router, build_simple_router};
use gotham::state::State;
use uuid::Uuid;

pub fn say_hello(state: State) -> (State, String) {
    (state, "Hello ".to_owned() + &Uuid::new_v4().to_string())
}

fn router() -> Router {
    build_simple_router(|route| {
        route.get("/").to(say_hello);
    })
}

pub fn main() {
    let addr = "127.0.0.1:3000";
    gotham::start(addr, router()).unwrap();
}
