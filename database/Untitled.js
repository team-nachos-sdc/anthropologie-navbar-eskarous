// -- let's create a temp table to bulk data into
create temporary table temp_json (values text);
copy temp_json from '/Users/Michael_Eskarous/Desktop/anthropologie-product-eskarous/database/records/one-million-records01.json';

copy temp_json from '/Users/Michael_Eskarous/Desktop/anthropologie-product-eskarous/database/ten-thousand-records01.json';
// -- uncomment the line above to insert records into your table
insert into productdetails ("productCategoryId", "productCategory", "productName", "price", "brandName", "onlineExclusive", "reviewStarCount", "reviewCount", "colors", "colorImages", "fit", "sizeStandard", "sizePetite", "sizePlus", "sizesUnavailable", "sizePetiteUnavailable", "sizePlusUnavailable", "image")

select CAST(values->>'productCategoryId' as integer) as productCategoryId,
       CAST(values->>'productCategory' as varchar(120)) as productCategory,
       CAST(values->>'productName' as varchar(120)) as productName,
       CAST(values->>'price' as varchar(120)) as Path,
       CAST(values->>'brandName' as varchar(120)) as brandName,
       CAST(values->>'onlineExclusive' as boolean) as onlineExclusive, 
       CAST(values->>'reviewStarCount' as varchar(120)) as reviewStarCount, 
       CAST(values->>'reviewCount' as integer) as reviewCount, 
       CAST(values->>'colors' as varchar(120)) as colors, 
       CAST(values->>'colorImages' as varchar(120)) as colorImages, 
       CAST(values->>'fit' as varchar(120)[]) as fit, 
       CAST(values->>'sizeStandard' as varchar(120)[]) as sizeStandard, 
       CAST(values->>'sizePetite' as varchar(120)[]) as sizePetite, 
       CAST(values->>'sizePlus' as varchar(120)[]) as sizePlus, 
       CAST(values->>'sizesUnavailable' as varchar(120)) as sizesUnavailable, 
       CAST(values->>'sizePetiteUnavailable' as varchar(120)) as sizePetiteUnavailable, 
       CAST(values->>'sizePlusUnavailable' as varchar(120)) as sizePlusUnavailable, 
       CAST(values->>'image' as varchar(120)[]) as image 
from   (
        select json_array_elements(replace(values,'\','\\')::json) as values 
        from temp_json

       ) a;


COPY productdetails(product_category_id, product_category, product_name, price, brand_name, online_exclusive, review_star_count, review_count, fit, size_standard, size_petite, size_plus, sizes_unavailable, size_petite_unavailable, size_plus_unavailable, image, colors, color_images) 
FROM '/Users/Michael_Eskarous/Desktop/anthropologie-product-eskarous/database/records/ten-records01.csv' DELIMITER ',' CSV HEADER;
