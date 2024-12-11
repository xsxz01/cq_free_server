// Prevent console window in addition to Slint window in Windows release builds when, e.g., starting the app via file manager. Ignored on other platforms.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![feature(async_closure)]
use std::error::Error;

use cq_free_server::bhbbk::get_bhbbk_data;
use slint::{Model, ModelRc, SharedString, StandardListViewItem, VecModel};

slint::include_modules!();

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let ui = AppWindow::new()?;

    // get bhbbk data
    ui.on_getCqServerList({
        let ui_handle = ui.as_weak();
        move || {
            let ui = ui_handle.unwrap();
            let _ = slint::spawn_local(async move {
                let bhbbk_data = get_bhbbk_data(ui.get_current_page() as u32, 100)
                    .await
                    .unwrap();
                ui.set_counter(bhbbk_data.total);
                let total_page = bhbbk_data.total / 100 + 1;
                ui.set_total_page(total_page);
                let mut bhbbk_data_vec: Vec<ModelRc<StandardListViewItem>> = Vec::new();
                for item in bhbbk_data.data {
                    if item.bbk_hots == "zd" {
                        continue;
                    }
                    let row = VecModel::<StandardListViewItem>::from_slice(&[
                        StandardListViewItem::from(item.bbk_hots.clone().as_str()),
                        StandardListViewItem::from(item.bbk_show_web.clone().as_str()),
                        StandardListViewItem::from(item.bbk_name.clone().as_str()),
                        StandardListViewItem::from(item.bbk_type.clone().as_str()),
                        StandardListViewItem::from(item.bbk_engine.clone().as_str()),
                        StandardListViewItem::from(item.bbk_updated.clone().as_str()),
                        StandardListViewItem::from(item.bbk_screenshots.clone().as_str()),
                        StandardListViewItem::from(item.bbk_buy_link.clone().as_str()),
                    ]);
                    bhbbk_data_vec.push(row);
                }
                let data_list =
                    VecModel::<ModelRc<StandardListViewItem>>::from_slice(&bhbbk_data_vec);
                ui.set_cqServerList(data_list);
            });
        }
    });

    ui.on_selectCqServer({
        let ui_handle = ui.as_weak();
        move || {
            let ui = ui_handle.unwrap();
            let row_num = ui.get_current_row() as usize;
            let row_data = ui.get_cqServerList().row_data(row_num).unwrap();
            let row_data_vec: Vec<SharedString> = row_data.iter().map(|item| item.text).collect();
            // open browser
            let url = row_data_vec.get(6).unwrap().as_str();
            opener::open(url).unwrap();
        }
    });

    ui.on_parseInt(|x| {
        x.parse::<i32>().unwrap_or_default()
    });

    ui.run()?;

    Ok(())
}
