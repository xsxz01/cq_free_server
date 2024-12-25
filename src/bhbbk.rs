use serde::Deserialize;

const BASE_API: &str = "http://111.170.149.130:3000/bbkApi";

#[derive(Debug, Deserialize, Clone)]
#[serde(rename_all(deserialize = "camelCase"))]
pub struct BhbbkItem {
    #[serde(rename = "_id")]
    pub _id: String,
    pub bbk_name: String,
    pub bbk_line_height: String,
    pub bbk_font_weight: String,
    pub bbk_show_web: String,
    pub bbk_screenshots: String,
    pub bbk_updated: String,
    pub bbk_engine: String,
    pub bbk_type: String,
    pub bbk_hots: String,
    pub bbk_buy_link: String,
    #[serde(default)]
    pub bb_size: String,
    #[serde(default)]
    pub bd_size: String,
    pub edit_time: String,
    pub uniqueid: String,
    #[serde(rename(deserialize = "__v"))]
    #[serde(default)]
    pub _v: i32,
}

#[derive(Debug, Deserialize, Clone)]
#[serde(rename_all(deserialize = "camelCase"))]
pub struct BhbbkResponse {
    pub is_ok: bool,
    pub total: i32,
    pub data: Vec<BhbbkItem>,
}

pub async fn get_bhbbk_data(
    page: u32,
    size: u32,
) -> Result<BhbbkResponse, Box<dyn std::error::Error>> {
    let request_url = format!(
        "{}/bbkdata?currentPage={}&pagesize={}&search=",
        BASE_API, page, size
    );
    let client = reqwest::Client::new();
    let resp = client.get(request_url).send().await?;
    let response_text = resp.text().await?;
    let json: BhbbkResponse = serde_json::from_str(response_text.as_str()).unwrap();
    Ok(json)
}
