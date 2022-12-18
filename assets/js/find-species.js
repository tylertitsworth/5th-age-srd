function q1(option) {
    question2 = 'How Local is your Character?';
    o1 = 'Local';
    o2 = 'Continental';
    o3 = 'Planar';
    $('input#'+option.id).attr('result1', 'selected');
    $('span#question').html(question2);
    $('input#option1').val(o1);
    $('input#option1').attr('onclick', 'q2(option1)');
    $('input#option1').prop('title', 'No more than a day\'s journey from the game\'s starting location.');
    $('input#option2').val(o2);
    $('input#option2').attr('onclick', 'q2(option2)');
    $('input#option2').prop('title', 'From Marmadas.');
    $('input#option3').val(o3);
    $('input#option3').attr('onclick', 'q2(option3)');
    $('input#option3').prop('title', 'Not from the Material Realm, but instead from another plane of existence.');
}

function q2(option) {
    $('input#'+option.id).attr('result2', 'selected');
    $('input#option1').val(o1);
    $('input#option2').val(o2);
    $('input#option3').val(o3);
    result();
}

function result() {
    if ($('input#option1').attr('result1') == 'selected') {
        if ($('input#option1').attr('result2') == 'selected') {
            $('input#option1').val('Human');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option1').prop('title', 'The most common species in the game. Try to develop a specific culture for your character they won\'t \'pop\'.');
            $('input#option2').val('Dwarf');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option2').prop('title', 'Dwarves are the most well traveled race, and despite that they all have a strong sense of community.');
            $('input#option3').val('Halfling');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
            $('input#option3').prop('title', 'Halflings are homely and simple, and are sometimes curious and adventurous.')
        } else if ($('input#option2').attr('result2') == 'selected') {
            $('input#option1').val('Dragonborn');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option1').prop('title', 'Dragonborn are proud and honorable, and depending on their scales are in a different caste.');
            $('input#option2').val('Wood Elf');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option2').prop('title', 'Wood Elves are in tune with nature and live for the forest.');
            $('input#option3').val('Lower Tiefling');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
            $('input#option3').prop('title', 'Lower Tieflings are the children of Zariel, and are cruel, sadistic, and quick to anger.');
        } else if ($('input#option3').attr('result2') == 'selected') {
            $('input#option1').val('Genasi');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option1').prop('title', 'Genasi are the children of the elemental planes, and are different depending on their element.');
            $('input#option2').val('Minotaur');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option2').prop('title', 'Minotaurs are loyal and protective of their friends. They tend to be associated with a Greek Deity.');
            $('input#option3').val('');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
            $('input#option3').prop('title', '');
        }
    } else if ($('input#option2').attr('result1') == 'selected') {
        if ($('input#option1').attr('result2') == 'selected') {
            $('input#option1').val('Half-Elf');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option1').prop('title', 'Half-Elves are often feel extradited from their peoples, and tend to be gifted.');
            $('input#option2').val('Half-Orc');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option2').prop('title', 'Half-Orcs are brash and headstrong, and are often seen as a threat.');
            $('input#option3').val('');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
            $('input#option3').prop('title', '');
        } else if ($('input#option2').attr('result2') == 'selected') {
            $('input#option1').val('High Elf');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option1').prop('title', 'High Elves are haughty and snobbish. They are in tune with the arcane and have encyclopedic knowledge.');
            $('input#option2').val('Higher Tiefling');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option2').prop('title', 'Higher Tieflings are the children of Asmodeus, and like to scheme and plot.');
            $('input#option3').val('Lizardfolk');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
            $('input#option3').prop('title', 'Lizardfolk are bound by instinct and tradition. They are often seen as a threat.');
        } else if ($('input#option3').attr('result2') == 'selected') {
            $('input#option1').val('Tabaxi');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option1').prop('title', 'Tabaxi are cat-like humanoids, and are not from this plane of existence. They are often associated with an egyptian deity.');
            $('input#option2').val('Warforged');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option2').prop('title', 'Warforged are made of wood or metal and are designed for war. They are not from this realm and tend to be robotic despite having a soul.');
            $('input#option3').val('');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
            $('input#option3').prop('title', '');
        }
    } else if ($('input#option3').attr('result1') == 'selected') {
        if ($('input#option1').attr('result2') == 'selected') {
            $('input#option1').val('Goblin');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option1').prop('title', 'Goblins are small and cunning. They are are not welcome in most places.');
            $('input#option2').val('');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option2').prop('title', '');
            $('input#option3').val('');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
            $('input#option3').prop('title', '');
        } else if ($('input#option2').attr('result2') == 'selected') {
            $('input#option1').val('Aasimar');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option1').prop('title', 'Aasimar are children of a celestial and have a deific parent. They are gifted leaders and casters.');
            $('input#option2').val('Dark Elf');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option2').prop('title', 'Dark Elves worship Lolth, and are not welcome in most places. They have a very \'backwards\' matriarchal warrior society.');
            $('input#option3').val('Gnome');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
            $('input#option3').prop('title', 'Svirfneblin are the gnomes of the Underdark. They have a knack for tinkering and are very cowardly.');
        } else if ($('input#option3').attr('result2') == 'selected') {
            $('input#option1').val('Any (but from another plane)');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option1').prop('title', 'Pick a race and remove all of the lore associated with them and come up with a new set of lore for them. What Plane/Realm/Region are they from?')
            $('input#option2').val('');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option2').prop('title', '');
            $('input#option3').val('');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
            $('input#option3').prop('title', '');
        }
    }
    $('span#question').html('Recommended Options:')
}

function reset() {
    question1 = 'How Rare is your Character?';
    o1 = 'Common';
    o2 = 'Uncommon';
    o3 = 'Unique';
    $('span#question').html(question1);
    $('input#option1').val(o1);
    $('input#option1').attr('onclick', 'q1(option1)');
    $('input#option1').get(0).type = 'button';
    $('input#option1').removeAttr('readonly');
    $('input#option1').removeAttr('result1');
    $('input#option1').removeAttr('result2');
    $('input#option1').prop('title', 'A species that you would expect to find in over 60% of the population of the nearby area. One that might be an expected traveler.');
    $('input#option2').val(o2);
    $('input#option2').attr('onclick', 'q1(option2)');
    $('input#option2').get(0).type = 'button';
    $('input#option2').removeAttr('readonly');
    $('input#option2').removeAttr('result1');
    $('input#option2').removeAttr('result2');
    $('input#option2').prop('title', 'A species that there may be a small family of spanning over a region. One that might have roots elsewhere.');
    $('input#option3').val(o3);
    $('input#option3').attr('onclick', 'q1(option3)');
    $('input#option3').get(0).type = 'button';
    $('input#option3').removeAttr('readonly');
    $('input#option3').removeAttr('result1');
    $('input#option3').removeAttr('result2');
    $('input#option3').prop('title', 'Such a rare find in urban societies. One that guards mistake for something else.');
}