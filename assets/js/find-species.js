function q1(option) {
    question2 = 'How Local is your Character?';
    o1 = 'Local';
    o2 = 'Continental';
    o3 = 'Planar';
    $('input#'+option.id).attr('result1', 'selected');
    $('span#question').html(question2);
    $('input#option1').val(o1);
    $('input#option1').attr('onclick', 'q2(option1)');
    $('input#option2').val(o2);
    $('input#option2').attr('onclick', 'q2(option2)');
    $('input#option3').val(o3);
    $('input#option3').attr('onclick', 'q2(option3)');
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
            $('input#option2').val('Dwarf');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option3').val('Halfling');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
        } else if ($('input#option2').attr('result2') == 'selected') {
            $('input#option1').val('Dragonborn');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option2').val('Wood Elf');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option3').val('Lower Tiefling');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
        } else if ($('input#option3').attr('result2') == 'selected') {
            $('input#option1').val('Genasi');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option2').val('Minotaur');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option3').val('');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
        }
    } else if ($('input#option2').attr('result1') == 'selected') {
        if ($('input#option1').attr('result2') == 'selected') {
            $('input#option1').val('Half-Elf');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option2').val('Half-Orc');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option3').val('');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
        } else if ($('input#option2').attr('result2') == 'selected') {
            $('input#option1').val('High Elf');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option2').val('Higher Tiefling');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option3').val('Lizardfolk');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
        } else if ($('input#option3').attr('result2') == 'selected') {
            $('input#option1').val('Tabaxi');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option2').val('Warforged');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option3').val('');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
        }
    } else if ($('input#option3').attr('result1') == 'selected') {
        if ($('input#option1').attr('result2') == 'selected') {
            $('input#option1').val('Goblin');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option2').val('');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option3').val('');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
        } else if ($('input#option2').attr('result2') == 'selected') {
            $('input#option1').val('Aasimar');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option2').val('Dark Elf');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option3').val('Gnome');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
        } else if ($('input#option3').attr('result2') == 'selected') {
            $('input#option1').val('Any (but from another plane)');
            $('input#option1').get(0).type = 'text';
            $('input#option1').attr('readonly', true);
            $('input#option1').removeAttr('onclick');
            $('input#option2').val('');
            $('input#option2').get(0).type = 'text';
            $('input#option2').attr('readonly', true);
            $('input#option2').removeAttr('onclick');
            $('input#option3').val('');
            $('input#option3').get(0).type = 'text';
            $('input#option3').attr('readonly', true);
            $('input#option3').removeAttr('onclick');
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
    $('input#option2').val(o2);
    $('input#option2').attr('onclick', 'q1(option2)');
    $('input#option2').get(0).type = 'button';
    $('input#option2').removeAttr('readonly');
    $('input#option2').removeAttr('result1');
    $('input#option2').removeAttr('result2');
    $('input#option3').val(o3);
    $('input#option3').attr('onclick', 'q1(option3)');
    $('input#option3').get(0).type = 'button';
    $('input#option3').removeAttr('readonly');
    $('input#option3').removeAttr('result1');
    $('input#option3').removeAttr('result2');
}