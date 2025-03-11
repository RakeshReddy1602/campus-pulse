let sql = `
select ucm.*, cc.name as clubCategoryName,c.*
from user_club_mapping as ucm
left join club as c
on ucm.fk_id_club = c.id
left join club_category as cc
on c.fk_id_category = cc.id
where
ucm.fk_id_status != 2
`