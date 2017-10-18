use user7;

-- Waarden toevoegen aan de table.

call EventTopicInsert('Auto, Boat & Air', @newId);
call EventTopicInsert('Business & Professional', @newId);
call EventTopicInsert('Charities & Causes', @newId);
call EventTopicInsert('Community & Culture', @newId);
call EventTopicInsert('Family & Education', @newId);
call EventTopicInsert('Fashion & Beauty', @newId);
call EventTopicInsert('Film. Media & Entertainment', @newId);
call EventTopicInsert('Food & Drink', @newId);
call EventTopicInsert('Government & Politics', @newId);
call EventTopicInsert('Health & Wellness', @newId);
call EventTopicInsert('Hobbies & Special Interests', @newId);
call EventTopicInsert('Home & Lifestyle', @newId);
call EventTopicInsert('Music', @newId);
call EventTopicInsert('Other', @newId);
call EventTopicInsert('Performing & Visual Arts', @newId);
call EventTopicInsert('Religion & Spirituality', @newId);
call EventTopicInsert('Science & Technology', @newId);
call EventTopicInsert('Seasonal', @newId);
call EventTopicInsert('Sports & Fitness', @newId);
call EventTopicInsert('Travel & Outdoor', @newId);


-- Update procedures testen.
call EventTopicUpdate("Replaced topic", 5);
call EventTopicUpdate("2nd Replaced topic", 7);


-- Delete procedures testen
call EventTopicDelete(1);
call EventTopicDelete(10);


-- Lees de rij met ID '5'.
call EventTopicSelectOne(5);


-- Lees alle rijen.
call EventTopicSelectAll();


-- Lees de rij met de opgegeven naam.
call EventTopicSelectByName('Seasonal');


-- Lees alle rijen waarvan de naam begint met 's'.
call EventTopicSelectLikeName('s');


-- Lees alle rijen die de substring 'ess' bevatten.
call EventTopicSelectLikeXName('ess');