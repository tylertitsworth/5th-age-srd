function getTotal() {
    var abilityModifiers = [-5, -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

    var abilityStr = parseInt($('input#abilityStr').val());
    var abilityDex = parseInt($('input#abilityDex').val());
    var abilityCon = parseInt($('input#abilityCon').val());
    var abilityInt = parseInt($('input#abilityInt').val());
    var abilityWis = parseInt($('input#abilityWis').val());
    var abilityCha = parseInt($('input#abilityCha').val());

    var bonusStr = parseInt($('input#bonusStr').val());
    var bonusDex = parseInt($('input#bonusDex').val());
    var bonusCon = parseInt($('input#bonusCon').val());
    var bonusInt = parseInt($('input#bonusInt').val());
    var bonusWis = parseInt($('input#bonusWis').val());
    var bonusCha = parseInt($('input#bonusCha').val());

    var totalStr = abilityStr + bonusStr;
    var totalDex = abilityDex + bonusDex;
    var totalCon = abilityCon + bonusCon;
    var totalInt = abilityInt + bonusInt;
    var totalWis = abilityWis + bonusWis;
    var totalCha = abilityCha + bonusCha;

    $('span#totalStr').html(totalStr);
    $('span#totalDex').html(totalDex);
    $('span#totalCon').html(totalCon);
    $('span#totalInt').html(totalInt);
    $('span#totalWis').html(totalWis);
    $('span#totalCha').html(totalCha);

    var points = [-28, -24, -20, -16, -12, -9, -6, -4, -2, -1, 0, 1, 2, 3, 4, 6, 8, 11, 14];

    var costStr = points[abilityStr];
    var costDex = points[abilityDex];
    var costCon = points[abilityCon];
    var costInt = points[abilityInt];
    var costWis = points[abilityWis];
    var costCha = points[abilityCha];

    var modifierStr = abilityModifiers[totalStr];
    var modifierDex = abilityModifiers[totalDex];
    var modifierCon = abilityModifiers[totalCon];
    var modifierInt = abilityModifiers[totalInt];
    var modifierWis = abilityModifiers[totalWis];
    var modifierCha = abilityModifiers[totalCha];

    var totalCost = parseInt(costStr) + parseInt(costDex) + parseInt(costCon) + parseInt(costInt) + parseInt(costWis) + parseInt(costCha);
    
    $('span#costStr').html(costStr);
    $('span#costDex').html(costDex);
    $('span#costCon').html(costCon);
    $('span#costInt').html(costInt);
    $('span#costWis').html(costWis);
    $('span#costCha').html(costCha);

    $('span#modifierStr').html(modifierStr);
    $('span#modifierDex').html(modifierDex);
    $('span#modifierCon').html(modifierCon);
    $('span#modifierInt').html(modifierInt);
    $('span#modifierWis').html(modifierWis);
    $('span#modifierCha').html(modifierCha);
    $('span#totalCost').html(totalCost);
}

function scoreReset() {
    $('input#abilityStr').val(10);
    $('input#abilityDex').val(10);
    $('input#abilityCon').val(10);
    $('input#abilityInt').val(10);
    $('input#abilityWis').val(10);
    $('input#abilityCha').val(10);

    $('input#bonusStr').val(0);
    $('input#bonusDex').val(0);
    $('input#bonusCon').val(0);
    $('input#bonusInt').val(0);
    $('input#bonusWis').val(0);
    $('input#bonusCha').val(0);

    $('span#totalStr').html(0);
    $('span#totalDex').html(0);
    $('span#totalCon').html(0);
    $('span#totalInt').html(0);
    $('span#totalWis').html(0);
    $('span#totalCha').html(0);

    $('span#costStr').html(0);
    $('span#costDex').html(0);
    $('span#costCon').html(0);
    $('span#costInt').html(0);
    $('span#costWis').html(0);
    $('span#costCha').html(0);

    $('span#modifierStr').html(0);
    $('span#modifierDex').html(0);
    $('span#modifierCon').html(0);
    $('span#modifierInt').html(0);
    $('span#modifierWis').html(0);
    $('span#modifierCha').html(0);
    $('span#totalCost').html(0);
}
